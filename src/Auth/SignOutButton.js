import { getAuth, signOut } from 'firebase/auth';
import { auth } from './firebase';

function SignOutButton() {
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            });
    };

    return <button className="small-button" onClick={handleSignOut}>Sign Out</button>;
}

export default SignOutButton;
