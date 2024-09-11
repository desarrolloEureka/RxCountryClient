import { auth } from "@/shared/firebase/firebase";
import { signOut } from "firebase/auth";

const Logout = () => {
    const logOut = () => signOut(auth);
    return { logOut };
};

export default Logout;
