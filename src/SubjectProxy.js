import {subjectChangedEvent} from "./Events.js";

export class SubjectProxy
{
    subject;
    subjectHandler;

    proxy;

    constructor(subject, subjectHandler) {
        this.subject = subject;
        this.subjectHandler = subjectHandler
    }

    createProxy()
    {
        const subject = this.subject;

        this.proxy = new Proxy(subject, {
            set(target, property, value) {
                // Only for debugging
                console.log(`Property '${property}' of subject '${target.code}' changed to '${value}'`);

                // Set the property that changed
                target[property] = value;

                // Handle Changes
                if (property === 'status') {
                    subject.getSubjectHandler().handleStatusChange();
                }

                if (property === 'allowed') {
                    subject.getSubjectHandler().handleAllowedChange();
                }

                document.dispatchEvent(subjectChangedEvent)

                return true;
            }
        });
    }
}