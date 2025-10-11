import { NextResponse } from "next/server";

// This function handles POST requests to add a subscriber to the Mailchimp list and apply a tag
export async function POST(req: Request) {
  try {
    const { email, merge_fields } = await req.json(); // Get all fields from the request body
    console.log(typeof email)
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Get Mailchimp API credentials from environment variables
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const TAG_NAME = "WEBSITE_SUBSCRIBER";

    if (!API_KEY || !AUDIENCE_ID) {
      return NextResponse.json(
        { message: "Mailchimp configuration missing" },
        { status: 500 }
      );
    }

    // Extract the data center from the API key (the part after the hyphen)
    const DATACENTER = API_KEY.split("-")[1];
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    // Data to send to Mailchimp API to add the subscriber
    const data = {
      email_address: email,
      status: "subscribed", // Status: 'subscribed' means they will be added to the list immediately
      merge_fields: merge_fields,
    };

    // Make the POST request to Mailchimp API to add the subscriber
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check for any errors from Mailchimp
    if (response.status >= 400) {
      const errorData = await response.json();

      let userMessage = "An error occurred. Please try again.";

      switch (errorData.title) {
        case "Invalid Resource":
          userMessage = "Please check your information and try again.";
          break;
        case "Member Exists":
          userMessage = "You're already subscribed! Thanks for joining us.";
          break;
        case "Invalid Email":
          userMessage = "Please enter a valid email address.";
          break;
        case "Member In Compliance State":
          userMessage = "We couldn't process your request. Please contact support.";
          break;
        case "Internal Server Error":
          userMessage = "Our servers are currently down. Please try again later.";
          break;
      }

      return NextResponse.json({ message: userMessage }, { status: 400 });
    }

    // Tag the new subscriber with a specific tag
    const subscriberHash = await response.json().then((data) => data.id);
    const tagUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}/tags`;
    const tagData = {
      tags: [
        {
          name: TAG_NAME,
          status: "active", // Tag is active
        },
      ],
    };

    // Apply the tag to the subscriber
    const tagResponse = await fetch(tagUrl, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagData),
    });

    if (tagResponse.status >= 400) {
      const errorData = await tagResponse.json();
      return NextResponse.json(
        { message: errorData.detail || "Failed to apply tag" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Successfully subscribed and tagged!",
    });
  } catch (error) {
    console.error("Error subscribing to Mailchimp:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
