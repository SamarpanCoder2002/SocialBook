import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <div className="signin">
        <div className="signin__container">
            <div className="signin__container__header">
            <h2>Sign In</h2>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            </div>
            <form className="signin__container__form">
            <input type="text" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button>Sign In</button>
            </form>
        </div>
        </div>
    );
}

export default SignIn;