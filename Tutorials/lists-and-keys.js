/* Rendering Multiple Components */
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map(
    (number) => <li>{number}</li>
);
ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
);

/* Basic List Component */
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => 
        <li key={number.toString()}>
            {number}
        </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);

/* Keys */
// Keys help React identify which elements have changed
// The best way to pick a key is to use a string that uniquely identifies the element among its siblings
// i.e. an ID from your data:
const todoItems = todos.map((todo) =>
    <li key={todo.id}>
        {todo.text}
    </li>
);

// If there are no stable IDs, you can use the list item index as a last resort
// This approach can only be recommended for lists where the order of items will not change

/* Extracting Components with Keys */
// Keys only make sense in the context of the surrounding array
// E.g. if yu extract a ListItem component, keep the key on the ListItem elements in the array
// rather than on the <li> element in the array of ListItem

// Incorrect Key Usage:
function ListItem(props) {
    const value = props.value;
    return (
        // Wrong! There is no need to specify the key here:
        <li key={value.toString()}>
            {value}
        </li>
    );
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // Wrong! The key should have been specified here 
        <ListItem value={number} />
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);

// Correct Key Usage:
function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return <li>{props.value}</li>;
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // Correct! Key should be specified inside the array.
        <ListItem key={ListItem.toString()} value={number} />
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);

// A good rule of thumb is elements inside the map() call need keys

/* Keys must Only be Unique among Siblings */
// Keys should have different IDs to siblings, but need not have globally unique IDs, e.g.
function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );

    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );

    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
}

const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('root')
);

// Keys serve as a hint to React, but aren't passed to your components.
//If the same value is needed in the component, pass it explicitly as a prop with a different name:
const content = posts.map((post) =>
    <Post key={post.id} id={post.id} title={post.title} />
);

/* Embedding map() in JSX */
// In the examples above we declared a separate listItems variable and included it in JSX.
// JSX allows embedding any expression in "{}" so we could inline the map result.
// Sometime this results in clearer code bht can be abused.
// It is up to the individual to decide whether to extract a variable for readability.
// If map() becomes too nested, however, it may be time to consider extracting a component.