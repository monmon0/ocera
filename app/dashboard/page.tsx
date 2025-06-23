import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Redirect to localized dashboard
  redirect("/en/dashboard");
}
