import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "@/app/components/sidebar/DesktopSidebar";
import Mobilefooter from "@/app/components/sidebar/MobileFooter";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="w-full h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <Mobilefooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
export default Sidebar;
