// Redirect Institute Registration page to About Us
import { redirect } from "next/navigation";

export default function InstituteRegistrationPage() {
  redirect("/about-institute");
  return null;
}
