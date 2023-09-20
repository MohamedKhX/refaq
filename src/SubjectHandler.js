export class SubjectHandler
{
    subject;
    subjectElement;

    constructor(subject, subjectElement) {
        this.subject = subject;
        this.subjectElement = subjectElement;
    }

    handleClick()
    {
        this.subject.setStatus(! this.subject.getStatus())
    }

    handleStatusChange()
    {
        if(this.subject.status === false) {
            this.subjectElement.domElement.classList.remove('bg-green-600', 'text-white')

            this.handleNestedStatus(false)

            return this;
        }

        this.subjectElement.domElement.classList.add('bg-green-600', 'text-white')
        this.handleNestedStatus(true);
    }

    handleNestedStatus(allowed = false)
    {
        const nestedSubjects = this.subject.getNestedSubjects();

        for (const nestedSubject of nestedSubjects) {
            if (allowed === true) {
                nestedSubject.setAllowed(true)
                continue;
            }

            if(nestedSubject.hasNestedSubjects()) {
                nestedSubject.getSubjectHandler().handleNestedStatus()
            }

            nestedSubject.setAllowed(false)
            nestedSubject.setStatus(false);
        }
    }

    handleAllowedChange()
    {
        this.subjectElement.domElement.disabled = this.subject.allowed !== true;

        return this;
    }
}