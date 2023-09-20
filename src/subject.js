import {SubjectElement} from "./subjectElement.js";
import {SubjectHandler} from "./SubjectHandler.js";

export class Subject
{
    code;
    name;
    root;
    units;
    status;
    allowed;

    subjects;

    subjectElement;
    subjectHandler;

    constructor(code, name, root, units, status, allowed) {
        this.code = code;
        this.name = name;
        this.root = root;
        this.units = units;
        this.status = status;
        this.allowed = allowed;

        this.subjectElement = new SubjectElement(this);
        this.subjectHandler = new SubjectHandler(this, this.subjectElement)
        this.subjectElement.setSubjectHandler(this.subjectHandler);
    }

    render(subjectsContainer)
    {
        return this.subjectElement.render(subjectsContainer);
    }

    setProxy(proxy)
    {
        this.proxy = proxy;
    }

    setSubjects(subjects)
    {
        this.subjects = subjects;
    }

    setAllowed(allowed = false)
    {
        this.allowed = allowed;

        // Trigger the proxy to handle the change
        if (this.proxy) {
            this.proxy.allowed = allowed;
        }

        return this;
    }

    setStatus(status = false)
    {
        this.status = status;

        // Trigger the proxy to handle the change
        if (this.proxy) {
            this.proxy.status = status;
        }

        return this;
    }

    getStatus()
    {
        return this.status;
    }

    getSubjectHandler()
    {
        return this.subjectHandler;
    }

    getNestedSubjects()
    {
        return this.subjects.filter((item, index) => item.root === this.code);
    }

    hasNestedSubjects()
    {
        return !! this.getNestedSubjects();
    }

    static calcUnits(subjectsArr)
    {
        return subjectsArr.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.units;
        }, 0);
    }
}