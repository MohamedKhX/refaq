export class SubjectsContainer
{
    subjectContainerElement
    subjects;

    constructor(subjects, subjectContainerElement) {
        this.subjects = subjects;
        this.subjectContainerElement = subjectContainerElement;
    }

    render()
    {
        const subjectsContainer = this;
        const subjectContainerElement = this.subjectContainerElement;

        this.subjects.forEach(function (subject) {
            subject.setSubjectsContainer(subjectsContainer)
                .listenForChanges();

            subject.render(subjectContainerElement)
                .registerClickEvent();
        })

        return this;
    }

    enableFirstSubjects()
    {
        this.subjects.forEach(function (subject) {
            if (subject.root === '') {
                subject.setAllowed(true)
            }
        })

        return this;
    }

    getSubjects()
    {
        return this.subjects;
    }

    getTotalSubjectsCount()
    {
        return this.subjects.length;
    }

    getCompletedSubjectsCount()
    {
        return this.subjects.reduce((accumulator, currentValue) => {
            if (currentValue.status === false)
                return accumulator + 0;

            return accumulator + 1;
        }, 0)
    }

    getRemainingSubjectsCount()
    {
        return this.subjects.reduce((accumulator, currentValue) => {
            if (currentValue.status === true)
                return accumulator + 0;

            return accumulator + 1;
        }, 0)
    }
    getTotalUnitsCount()
    {
        return this.subjects.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.units;
        }, 0)
    }

    getCompletedUnits()
    {
        return this.subjects.reduce((accumulator, currentValue) => {
            if (currentValue.status === false)
                return accumulator + 0;

            return accumulator + currentValue.units;
        }, 0)
    }

    getRemainingUnitsCount()
    {
        return this.subjects.reduce((accumulator, currentValue) => {
            if (currentValue.status === false)
                return accumulator + currentValue.units;

            return accumulator + 0;
        }, 0)
    }
}
