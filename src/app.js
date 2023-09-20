const subjectContainer = document.getElementById('subjectContainer')
const subjects = [
    {code:'GH203',name:'ثقافة إسلامية',root:'',units:2,status:false,allowed:false},
    {code:'152',name:'مبادئ العلوم السياسية',root:'',units:2,status:false,allowed:false},
    {code:"GH150",name:"اللغة العربية",root:"",units:2,status:false,allowed:false},

    {code:"GH141",name:"اللغة الانجليزية 1",root:"",units:2,status:false,allowed:false},
    {code:"GH142",name:"لغة انجيليزية 2",root:"GH141",units:2,status:false,allowed:false},

    {code:'GS100',name:'رياضة 1',root:'',units:3,status:false,allowed:false},
    {code:'GS101',name:'رياضة 2',root:'GS100',units:3,status:false,allowed:false},
    {code:'GS209',name:'جبر خطي والمنطق',root:'GS101',units:3,status:false,allowed:false},
    {code:"GS242",name:"إحصاء واحتمالات",root:"GS100",units:4,status:false,allowed:false},
    {code:'CS205',name:'تراكيب منفصلة',root:'GS101',units:3,status:false,allowed:false},

    {code:'CS200',name:'مبادئ حاسب',root:'',units:3,status:false,allowed:false},
    {code:'GS199',name:'مبادئ هندسة كهربائية',root:'',units:4,status:false,allowed:false},
    {code:"CS201",name:"اساسيات برمجة",root:"",units:4,status:false,allowed:false},

    {code:'CS207',name:'لغة C',root:'CS201',units:4,status:false,allowed:false},
    {code:'CS211',name:'تحليل نطم',root:'CS201',units:4,status:false,allowed:false},
    {code:'CS318',name:'هندسة برمجيات',root:'CS211',units:4,status:false,allowed:false},
    {code:'CS322',name:'نظم تشغيل',root:'CS318',units:4,status:false,allowed:false},

    {code:"CS313",name:"إدارة قواعد بيانات",root:"CS211",units:4,status:false,allowed:false},
    {code:'CS320',name:'لغة دلفي',root:'CS313',units:4,status:false,allowed:false},

    {code:"CS210",name:"برمجئة مرئية1 (بيسك)",root:"CS207",units:4,status:false,allowed:false},
    {code:"CS417",name:"برمجئة مرئية2 (VB)",root:"CS210",units:4,status:false,allowed:false},

    {code:"CS415",name:"البرمجة الشيئية باستخدام c++",root:"CS207",units:4,status:false,allowed:false},
    {code:'CS419',name:'لغة جافا',root:'CS415',units:4,status:false,allowed:false},
    {code:'CS423',name:'تصميم مواقع انترنت',root:'CS419',units:3,status:false,allowed:false},

    {code:"CS414",name:"النمذجة والمحاكاة",root:"CS210",units:4,status:false,allowed:false},
    {code:"CS427",name:"الرسم بالحاسوب",root:"CS414",units:4,status:false,allowed:false},

/*
    {code:'CS204',name:'مقدمة أنظمة رقمية',root:['CS2040','GS1990'],units:4,status:false,allowed:false},
*/
    {code:'CS204',name:'مقدمة أنظمة رقمية',root:'GS199',units:4,status:false,allowed:false},
    {code:'CS303',name:'تنظيم حاسبات',root:'CS204',units:4,status:false,allowed:false},
    {code:'CS319',name:'لغة تجميع ASSEMBLY',root:'CS303',units:4,status:false,allowed:false},
    {code:'CS425',name:'شبكات حاسوب',root:'CS319',units:4,status:false,allowed:false},
    {code:'CS321',name:'معماية الحاسوب',root:'CS319',units:4,status:false,allowed:false},
    {code:'CS416',name:'برمجة نطم',root:'CS321',units:4,status:false,allowed:false},


    {code:'CS312',name:'تراكيب بيانات 1',root:'CS207',units:4,status:false,allowed:false},
    {code:'CS418',name:'تراكيب بيانات 2',root:'CS312',units:4,status:false,allowed:false},
    {code:'CS426',name:'ذكاء اصطناعي',root:'CS418',units:4,status:false,allowed:false},


    {code:'CS308',name:'طرق عددية',root:'CS207',units:4,status:false,allowed:false},

    {code:'CS429',name:'مواضيع مختارة 1',root:'115',units:4,status:false,allowed:false,required:115},
    {code:'CS428',name:'مواضيع مختارة 2',root:'115',units:4,status:false,allowed:false,required:115},

    {code:'CS430',name:'مناهج البحث والتدريب الميداني',root:'115',units:2,status:false,allowed:false,required:115},
    {code:'',name:'مشروع التخرج',root:'115',units:4,status:false,allowed:false,required:115}

]
const subjectElements = [];

const subjectsProxy = subjects.map(createSubjectProxy);
function createSubjectProxy(subject) {
    return new Proxy(subject, {
        set(target, property, value) {

            //Only for debugging
            console.log(`Property '${property}' of subject '${target.code}' changed to '${value}'`);

            //Set the property that changed
            target[property] = value;

            // Handle Changes
            if(property === 'status') {
                handleStatusChange(target)
            }

            if(property === 'allowed') {
                handleAllowedChange(target)
            }


            return true;
        }
    });
}

function getSubjectByCode(code) {
    return subjectsProxy.find(item => item.code === code);
}

function getSubjectsByRoot(root) {
    return subjectsProxy.filter((item, index) => item.root === root);
}

function hasNestedSubjects(root) {
    return !! subjectsProxy.filter((item, index) => item.root === root);
}

function setAllowed(code, allowed = false) {
    getSubjectByCode(code).allowed = allowed;
}
function setStatus(code, status = false) {
    getSubjectByCode(code).status = status;
}

function getStatus(code) {
    return getSubjectByCode(code).status ;
}

function getElementByCode(code) {
    return document.querySelector(`[data-code="${code}"]`)
}

function renderHtml() {
    let html = ``;
    Object.values(subjects).forEach(function (entry) {
        html += buttonHtml(entry.name, entry.code)
    })
    subjectContainer.innerHTML = html;
}

function buttonHtml(name, code) {
    return `<button class="subject border border-gray-400 rounded p-1.5 flex-grow text-center font-bold
                                disabled:text-gray-500 disabled:font-normal disabled:bg-gray-100"
                               data-code="${code}"
                        disabled> ${name} </button>`
}

function setSubjectElements() {
    const subjectElementsNodeList =  document.querySelectorAll('.subject');
    subjectElementsNodeList.forEach(function (element) {
        subjectElements.push(element);
    })
}

function getSubjectElements() {
    return subjectElements;
}

function registerEvents() {
    subjectElements.forEach(function (element) {
        element.addEventListener('click', handleClick.bind(null, element))
    })
}

function enables() {
    subjectElements.forEach(function (element) {
        const subject = getSubjectByCode(element.dataset.code);
        if(subject.root !== '') return
        subject.allowed = true;
    })
}


function handleClick(element) {
    return setStatus(element.dataset.code, ! getStatus(element.dataset.code))
}

function handleStatusChange(subjectObject) {
    const subjectElement = getElementByCode(subjectObject.code);
    const nestedSubjects = getSubjectsByRoot(subjectObject.code);

    if(subjectObject.status === false) {
        return handleElementStatus(subjectObject)
    }

    subjectElement.classList.add('bg-green-600', 'text-white')

    nestedSubjects.forEach(function (nestedSubject) {
       return nestedSubject.allowed = true;
    })

}

function handleElementStatus(subjectObject) {
    const subjectElement = getElementByCode(subjectObject.code);
    const nestedSubjects = getSubjectsByRoot(subjectObject.code);
    subjectElement.classList.remove('bg-green-600', 'text-white')
   // if (! nestedSubjects) return;

    for (const nestedSubject of nestedSubjects) {
        if(hasNestedSubjects(nestedSubject.root)) {
            handleElementStatus(nestedSubject)
        }
        nestedSubject.allowed = false;
        nestedSubject.status = false;
    }

}

function handleAllowedChange(subject) {
    const subjectElement = getElementByCode(subject.code);

    console.log(subject.allowed)
    if (subject.allowed === true) {
        //Enable
        return subjectElement.disabled = false;
    }
    //Disable
    subjectElement.disabled = true;
}

renderHtml()
setSubjectElements()
registerEvents()
enables()
