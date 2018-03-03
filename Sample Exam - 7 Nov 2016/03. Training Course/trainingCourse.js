class TrainingCourse {
    constructor(title, trainer) {
        this.title = title;
        this.trainer = trainer;
        this.courses = [];
    }

    addTopic(title, date) {
        this.courses.push({title: title, date: date});
        this.courses.sort((a, b) => a.date - b.date);
        return this;
    }

    get firstTopic() {
        return this.courses[0];
    }

    get lastTopic() {
        return this.courses[this.courses.length - 1];
    }

    toString() {
        let text = `Course "${this.title}" by ${this.trainer}\n`;
        if (this.courses.length > 0) {
            text += this.courses.map(c => `* ${c.title} - ${c.date}`).join('\n');
        }
        return text;
    }
}

let test = new TrainingCourse("PHP", "Royal");
test.addTopic('Syntax', new Date(2017, 10, 12, 18, 0));
test.addTopic('Exam prep', new Date(2017, 10, 14, 18, 0));
test.addTopic('Intro', new Date(2017, 10, 10, 18, 0));
console.log(`${test.toString()}`);
console.log('Course "PHP" by Royal\n' +
    ' * Intro - Fri Nov 10 2017 18:00:00 GMT+0200 (FLE Standard Time)\n' +
    ' * Syntax - Sun Nov 12 2017 18:00:00 GMT+0200 (FLE Standard Time)\n' +
    ' * Exam prep - Tue Nov 14 2017 18:00:00 GMT+0200 (FLE Standard Time)');