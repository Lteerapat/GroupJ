import '../Styles/Landing.css';

const Landing = () => {

    return (
        <>
            <h1>Hello, Group J!</h1>
            <a href='/contact/1'>Check Error</a>
            <h2>Test Routers</h2>
            <a style={{'padding-right': '10px'}} href='/'>Landing</a>
            <a style={{'padding-right': '10px'}} href='/dashboard'>Dashboard</a>
            <a style={{'padding-right': '10px'}} href='/login'>Login</a>
            <a style={{'padding-right': '10px'}} href='/signup'>SignUp</a>
            <a style={{'padding-right': '10px'}} href='/achievement'>Achievement</a>
            <a style={{'padding-right': '10px'}} href='/contactus'>Contact Us</a>
            <a style={{'padding-right': '10px'}} href='/add'>Add</a>
            <a style={{'padding-right': '10px'}} href='/edit'>Edit</a>
        </>

       

    );

};

export default Landing;