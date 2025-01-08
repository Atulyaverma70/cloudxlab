import express from 'express';
import dotenv from 'dotenv'
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

const signupSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(50, "First name must be at most 50 characters"),
    lastName: z.string().min(1, "Last name is required").max(50, "Last name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be at most 50 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    phoneNumber: z.string().regex(/^\+91\s[6-9]\d{9}$/, "Phone number must be in the format '+91 10-digit-number'"),
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
})

// Signup 
app.post('/accounts/signup', async function(req, res){
    // Input validation
    const data = req.body;
    const validation = signupSchema.safeParse(data);
    if(!validation.success){
        res.status(400).json({
            msg: "validation failed"
        })
        return;
    }

    // Check if user with same credentials doesn't exist
    const userExist = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if(userExist){
        res.status(409).json({
            msg: "User Already exist"
        });
        return;
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create User in database
    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword
        }
    });


    res.status(201).json(user);
});

//login
app.use('/accounts/login', async function(req, res){
    // Input validation
    const data = req.body;
    const validation = loginSchema.safeParse(data);
    if(!validation.success){
        res.status(400).json({
            msg: "Invalid input"
        })
        return;
    }

    // Check User existence
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if(!user){
        res.status(404).json({
            msg: "User doesn't exist"
        });
        return;
    }

    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
    if(!isPasswordCorrect){
        res.status(400).json({
            msg: "Password Incorrect"
        })
        return;
    }

    //send response
    res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber
    });
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})