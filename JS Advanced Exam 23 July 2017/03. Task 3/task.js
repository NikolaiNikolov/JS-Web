class Task {
    constructor(title, deadline) {
        this.status = 'Open';
        this.title = title;
        this.deadline = deadline;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get deadline() {
        return this._deadline;
    }

    set deadline(value) {
        if (value < Date.now()) {
            throw new Error("Deadline can't be in the past.");
        }
        this._deadline = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get isOverdue() {
        return (Date.now() >= this.deadline && this.status !== 'Complete');
    }

    toString() {
        let statusIcons = {
            "Open": "\u2731",
            "In Progress": "\u219D",
            "Complete": "\u2714",
        };

        if (this.status === 'Complete') {
            return `[${statusIcons[this.status]}] ${this.title}`;
        }

        if (this.isOverdue) {
            return `[\u26A0] ${this.title} (overdue)`;
        } else {
            return `[${statusIcons[this.status]}] ${this.title} (deadline: ${this.deadline})`;
        }
    }

    static comparator(a, b) {
        if (a.isOverdue && a.status !== 'Complete') {
            return -1;
        }
        if (b.isOverdue && b.status !== 'Complete') {
            return 1;
        }
        if (a.status === b.status) {
            if (a.deadline < b.deadline) {
                return -1;
            }
            return 1;
        }

        let priority = ['In Progress', 'Open', 'Complete'];
        if (priority.indexOf(a.status) < priority.indexOf(b.status)) {
            return -1;
        } else if (priority.indexOf(a.status) > priority.indexOf(b.status)) {
            return 1;
        } else {
            return 0;
        }

    }
}

let date1 = new Date();
date1.setDate(date1.getDate() + 7); // Set date 7 days from now
let task1 = new Task('JS Homework', date1);
let date2 = new Date();
date2.setFullYear(date2.getFullYear() + 1); // Set date 1 year from now
let task2 = new Task('Start career', date2);
console.log(task1 + '\n' + task2);
console.log();
let date3 = new Date();
date3.setDate(date3.getDate() + 3); // Set date 3 days from now
let task3 = new Task('football', date3);
// Create two tasks with deadline set to current time
let task4 = new Task('Task 4', new Date());
let task5 = new Task('Task 5', new Date());
task1.status = 'In Progress';
task3.status = 'In Progress';
task5.status = "Complete";
let tasks = [task1, task2, task3, task4, task5];
tasks.sort(Task.comparator);
console.log(tasks.join('\n'));
