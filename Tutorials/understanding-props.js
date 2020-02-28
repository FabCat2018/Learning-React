/* Props are Read-Only */
// This is considered a pure function as it doesn't modify its inputs
// and gives the same result for the same inputs
function sum(a, b) {
    return a + b;
}

// This is an impure function
function withdraw(account, amount) {
    account.total -= amount;
}

// All React components must act like pure functions with respect to their props

/* Encapsulating a Component */
// Previously:
function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);

// Encapsulating Clock:
function Clock(props) {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);

/* Converting a Function to a Class */
class Clock extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
);