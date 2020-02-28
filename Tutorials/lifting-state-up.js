/* Temperature Calculator for Water Example */
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }

    handleChange(e) {
        this.setState({temperature: e.target.value});
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>
                    Enter temperature in Celsius:
                </legend>
                <input value={temperature} onChange={this.handleChange} />
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}

/* Adding a Second Input */
// We now want a Fahrenheit input as well as a Celsius input
// Extract a TemperatureInput component from Calculator
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }

    handleChange(e) {
        this.setState({temperature: e.target.value});
    }

    render() {
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>
                    Enter temperature in {scaleNames[scale]}:
                </legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}

// We can now change Calculator to render two separate inputs
class Calculator extends React.Component {
    render() {
        return (
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        );
    }
}

// We have two inputs now, but only one will update.
// We also cannot display BoilingVerdict from Calculator, as temperature is hidden inside TemperatureInput.

/* Writing Conversion Functions */
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

/* Lifting State Up */
// Currently both TemperatureInput components keep their values in local state
// However, we want them to be in sync with each other
// We can accomplish this by lifting state up to the closest common ancestor

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }

    // First we replace "this.state" with "this.props" in TemperatureInput
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>
                    Enter temperature in {scaleNames[scale]}:
                </legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }

    // Then to make TemperatureInput able to change its temperature, it calls onTemperatureChange
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }
}

// The changes to Calculator
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput scale="c" temperature={celsius} 
                    onTemperatureChange={this.handleCelsiusChange} 
                />

                <TemperatureInput scale="f" temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />

                <BoilingVerdict celsius={parseFloat(celsius)} />
            </div>
        );
    }
}