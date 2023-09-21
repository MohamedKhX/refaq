import {SubjectElement} from "./subjectElement.js";
import {SubjectHandler} from "./SubjectHandler.js";
import {SubjectProxy} from "./SubjectProxy.js";

export class Subject
{
    code;
    name;
    root;
    units;
    status;
    allowed;
    requiredUnits;

    subjectsContainer;

    subjectElement;
    subjectHandler;
    subjectProxy;

    constructor(code, name, root, units, status, allowed, requiredUnits = 0) {
        this.code = code;
        this.name = name;
        this.root = root;
        this.units = units;
        this.status = status;
        this.allowed = allowed;
        this.requiredUnits = requiredUnits;

        this.subjectElement = new SubjectElement(this);
        this.subjectHandler = new SubjectHandler(this, this.subjectElement);
        this.subjectProxy = new SubjectProxy(this, this.subjectHandler);

        this.subjectElement.setSubjectHandler(this.subjectHandler);
    }

    render(subjectsContainerElement)
    {
        return this.subjectElement.render(subjectsContainerElement);
    }

    listenForChanges()
    {
        this.subjectProxy.createProxy();
    }

    setSubjectsContainer(subjectsContainer)
    {
        this.subjectsContainer = subjectsContainer;
        return this;
    }

    setAllowed(allowed = false, TriggerProxy = true)
    {
        this.allowed = allowed;

        if (! TriggerProxy) return this;

        // Trigger the proxy to handle the change
        if (this.subjectProxy.proxy) {
            this.subjectProxy.proxy.allowed = allowed;
        }

        return this;
    }

    setStatus(status = false, TriggerProxy = true)
    {
        this.status = status;

        if (! TriggerProxy) return this;


        // Trigger the proxy to handle the change
        if (this.subjectProxy.proxy) {
            this.subjectProxy.proxy.status = status;
        }

        return this;
    }

    getStatus()
    {
        return this.status;
    }

    getRequiredUnits()
    {
        return this.requiredUnits;
    }

    getSubjectHandler()
    {
        return this.subjectHandler;
    }

    getNestedSubjects()
    {
        return this.subjectsContainer.getSubjects().filter((item, index) => item.root === this.code);
    }

    getSubjectContainer()
    {
        return this.subjectsContainer;
    }

    hasNestedSubjects()
    {
        return !! this.getNestedSubjects();
    }
}