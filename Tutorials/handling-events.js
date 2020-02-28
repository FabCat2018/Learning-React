/* Differences Between HTML and React */
// HTML:
<button onclick="activateLasers()">
    Activate Lasers
</button>

// React:
<button onClick={activateLasers}>
    Activate Lasers
</button>

// False cannot be returned to prevent default behaviour in React.
// Instead preventDefault must be called explicitly, e.g.
    // In HTML:
    <a href="#" onclick="console.log('The link was clicked'); return false">
        Click me
    </a>

    // In React:
    function ActionClick() {
        function handleClick(e) {
            e.preventDefault();
            console.log('The link was clicked');
        }

        return (
            <a href="#" onClick={handleClick}>
                Click me
            </a>
        );
    }

// When using React, addEventListener is not needed.
// Instead provide a a listener after the element is initially rendered.

// When defining a component using class notation, it is common for the event handler
// to be a method on the class, e.g.
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // This binding is necessary to make 'this' work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);

/* Passing Arguments to Event Handlers */
// Two equivalent ways:
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// OR
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

// In both cases the event will be passed as a second argument after the id.
// With an arrow function, we must pass the event explicitly, but using bind will automatically
// forward any further arguments