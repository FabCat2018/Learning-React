/* Adding Local State to a Class */
// State is like Props but private and fully controlled by the component
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

/* Adding Lifecycle Methods to a Class */
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

/* Using State Correctly */
// Do NOT modify state directly
    this.state.comment = 'Hello';       // Wrong
    this.setState({comment: 'Hello'});  //Correct
    // The only place to modify this.state is the constructor

// State updates may be asynchronous
    this.setState({
        counter: this.state.counter + this.props.increment
    });     // Wrong, as cannot rely on state or props for calculating new value of state or props

    this.setState((state, props) => ({
        counter: state.counter + props.increment
    }));    // Correct, as function will receive correct values of previous state and props, then calculate

// State updates are merged
    // E.g.
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            comments: []
        };
    }

    // Update independently with separate setState() calls
    componentDidMount() {
        fetchPosts().then(response => {
            this.setState({
                posts: response.posts
            });
        });

        fetchComments().then(response => {
            this.setState({
                comments: response.comments
            });
        });
    }
    // Merging is shallow, i.e. only affects the property requested, but replaces it completely.

// The Data Flows Down
    // Neither parent nor child components can know if a component has state or not
    // and shouldn't care if it is defined as a function or as a class.

    // A component may choose to pass its state down as props to a child component, e.g.
    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>  // This works for any component