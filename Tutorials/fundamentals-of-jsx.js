/* Hello World Example */
ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);

/* Introducing JSX */
const element = <h1>Hello, world!</h1>;

/* Embedding Expressions in JSX */
    // Embedding variable
    const name = 'Josh Perez';
    const element = <h1>Hello, {name}!</h1>;

    ReactDOM.render(
        element,
        document.getElementById('root')
    );

    // Embedding Function result
    function formatName(user) {
        return user.firstName + ' ' + user.lastName;
    }

    const user = {
        firstName: 'Harper',
        lastName: 'Perez'
    };

    const element = (
        <h1>Hello, {formatName(user)}!</h1>
    );

    ReactDOM.render(
        element,
        document.getElementById('root')
    );

/* Using JSX as an Expression */
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}

/* Specifying Attributes with JSX */
const element = <div tabIndex="0"></div>;
// OR
const element = <img src={user.avatarUrl}></img>;

/* Specifying Children with JSX */
const element = <img src={user.avatarUrl} />;   // Empty tag can be immediately closed
const element = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
    </div>
);

/* Embedding User Input in JSX */
const title = response.potentiallyMaliciousInput;
// This is safe as everything is escaped before rendering
const element = <h1>{title}</h1>;

/* JSX Objects */
const element = (
    <h1 className="greeting">Hello, world!</h1>
);
// OR Identically
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);