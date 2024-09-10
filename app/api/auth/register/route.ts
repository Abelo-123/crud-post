import { NextResponse } from "next/server";
import supabase from "@/app/lib/supabase";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({ result: "Missing required fields" }, { status: 400 });
    }

    // Insert the data and select the 'user_id' of the newly inserted row
    const { data: insertedData, error: insertError } = await supabase
      .from('user')
      .insert({ username, email, password })
      .select('user_id')
      .single();

    if (insertError) {
      console.error('Insert Error:', insertError.message);
      return NextResponse.json({ result: insertError.message }, { status: 400 });
    }

    if (!insertedData) {
      return NextResponse.json({ result: "No data returned from insert" }, { status: 400 });
    }

    return NextResponse.json({ result: 'Success' }, { status: 200 });

  } catch (err) {
    console.error('Unexpected Error:', err);
    return NextResponse.json({ result: "Unexpected error occurred" }, { status: 500 });
  }
}

    // // Generate a random token
    // const token = crypto.randomBytes(32).toString('hex');

    // // Set up email transport
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });

    // const mailOptions = {
    //   from: 'abeloabate01@gmail.com',
    //   to: insertedData.email,
    //   subject: 'Verify your email',
    //   text: `Click the following link to verify your email: http://localhost:3000/api/auth/verify-email?token=${token}`
    // };

    // // Send verification email
    // const emailResponse = await transporter.sendMail(mailOptions);

    // if (emailResponse.rejected.length > 0) {
    //   console.error('Email Error:', emailResponse.rejected);
    //   return NextResponse.json({ result: "Error sending email" }, { status: 500 });
    // }

    // // Insert token into the verification table
    // const { data: insertedToken, error: tokenError } = await supabase
    //   .from('verification_table')
    //   .insert([{ user_id: insertedData.user_id, token }])
    //   .select('user_id, token')
    //   .single();

    // if (tokenError) {
    //   console.error('Token Insert Error:', tokenError.message);
    //   return NextResponse.json({ result: "Error inserting token" }, { status: 400 });
    // }

    // if (!insertedToken) {
    //   return NextResponse.json({ result: "No data returned from token insert" }, { status: 400 });
    // }


