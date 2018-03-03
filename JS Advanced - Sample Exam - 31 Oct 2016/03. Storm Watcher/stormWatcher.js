(function solve() {
    let id = 0;
    class Record {
        constructor(temperature, humidity, pressure, windSpeed) {
            this.temperature = temperature;
            this.humidity = humidity;
            this.pressure = pressure;
            this.windSpeed = windSpeed;
            this.id = ++id;
            if (this.windSpeed > 25 && this.temperature < 20 && (this.pressure < 700 || this.pressure > 900)) {
                this.weather = 'Stormy';
            } else {
                this.weather = 'Not stormy';
            }
        }

        toString() {
            return `Reading ID: ${this.id}\n` +
                `Temperature: ${this.temperature}*C\n` +
                `Relative Humidity: ${this.humidity}%\n` +
                `Pressure: ${this.pressure}hpa\n` +
                `Wind Speed: ${this.windSpeed}m/s\n` +
                `Weather: ${this.weather}`;
        }
    }
    return Record;
}());

let Record = solve;
let record2 = new Record(10, 40, 680, 30);
console.log(record2.toString());
