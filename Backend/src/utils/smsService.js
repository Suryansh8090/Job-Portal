import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendStatusSMS(
  phoneNumber,
  studentName,
  status,
  companyName,
  role
) {
  const fromNumber = process.env.TWILIO_PHONE;

  // Validate phoneNumber input
  if (
    !phoneNumber ||
    typeof phoneNumber !== "string" ||
    !phoneNumber.startsWith("+")
  ) {
    console.error("Invalid phone number:", phoneNumber);
    throw new Error("SMS sending failed: invalid phone number");
  }

  // Check that sender number is configured
  if (!fromNumber) {
    console.error("Twilio sender number (TWILIO_PHONE) is not set!");
    throw new Error("SMS sending failed: Twilio sender number is missing");
  }

  // Prevent sending SMS if sender and recipient are the same number
  if (phoneNumber === fromNumber) {
    console.error(
      "Recipient phone number is same as sender number:",
      phoneNumber
    );
    throw new Error(
      "SMS sending failed: recipient and sender numbers cannot be the same"
    );
  }

  try {
    const message = `Hello ${studentName}, your application status for the role of ${role} at ${companyName} has been updated to: ${status}`;
    await client.messages.create({
      body: message,
      from: fromNumber,
      to: phoneNumber,
    });
    console.log("SMS sent successfully");
  } catch (error) {
    console.error("Failed to send SMS via Twilio:", error);
    throw new Error("SMS sending failed");
  }
}
