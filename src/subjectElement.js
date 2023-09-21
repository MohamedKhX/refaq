export class SubjectElement
{
    subject;
    subjectHandler;

    //Html Element in the dom
    domElement;

    constructor(subject) {
        this.subject = subject;
    }

    setSubjectHandler(subjectHandler)
    {
        this.subjectHandler = subjectHandler;
    }

    render(subjectsContainerElement)
    {
        subjectsContainerElement.insertAdjacentHTML('beforeend', this.html())
        this.domElement = document.querySelector(`[data-code="${this.subject.code}"]`);
        return this;
    }

    html()
    {
        return `<button class="subject border border-gray-400 rounded p-1.5 flex-grow text-center font-bold
                               disabled:text-gray-500 disabled:font-normal disabled:bg-gray-100"
                        data-code="${this.subject.code}" disabled>
                        ${this.subject.name} 
                </button>`
    }

    registerClickEvent()
    {
        this.domElement.addEventListener('click', () => this.subjectHandler.handleClick())
    }
}