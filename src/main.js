import {Subject} from "./subject.js";

const subjectContainer = document.getElementById('subjectContainer')

const subjects = [

    new Subject('GH203', 'ثقافة إسلامية', '', 2, false, false),
    new Subject('152', 'مبادئ العلوم السياسية', '', 2, false, false),
    new Subject('GH150', 'اللغة العربية', '', 2, false, false),

    new Subject('GH141', 'اللغة الانجليزية 1', '', 2, false, false),
    new Subject('GH142', 'لغة انجيليزية 2', 'GH141', 2, false, false),

    new Subject('GS100', 'رياضة 1', '', 3, false, false),
    new Subject('GS101', 'رياضة 2', 'GS100', 3, false, false),
    new Subject('GS209', 'جبر خطي والمنطق', 'GS101', 3, false, false),
    new Subject('GS242', 'إحصاء واحتمالات', 'GS100', 4, false, false),
    new Subject('CS205', 'تراكيب منفصلة', 'GS101', 3, false, false),

    new Subject('CS200', 'مبادئ حاسب', '', 3, false, false),
    new Subject('GS199', 'مبادئ هندسة كهربائية', '', 4, false, false),
    new Subject('CS201', 'اساسيات برمجة', '', 4, false, false),

    new Subject('CS207', 'لغة C', 'CS201', 4, false, false),
    new Subject('CS211', 'تحليل نظم', 'CS201', 4, false, false),
    new Subject('CS318', 'هندسة برمجيات', 'CS211', 4, false, false),
    new Subject('CS322', 'نظم تشغيل', 'CS318', 4, false, false),

    new Subject('CS313', 'إدارة قواعد بيانات', 'CS211', 4, false, false),
    new Subject('CS320', 'لغة دلفي', 'CS313', 4, false, false),

    new Subject('CS210', 'برمجئة مرئية1 (بيسك)', 'CS207', 4, false, false),
    new Subject('CS417', 'برمجئة مرئية2 (VB)', 'CS210', 4, false, false),

    new Subject('CS415', 'البرمجة الشيئية باستخدام c++', 'CS207', 4, false, false),
    new Subject('CS419', 'لغة جافا', 'CS415', 4, false, false),
    new Subject('CS423', 'تصميم مواقع انترنت', 'CS419', 3, false, false),

    new Subject('CS414', 'النمذجة والمحاكاة', 'CS210', 4, false, false),
    new Subject('CS427', 'الرسم بالحاسوب', 'CS414', 4, false, false),

    new Subject('CS204', 'مقدمة أنظمة رقمية', 'GS199', 4, false, false),
    new Subject('CS303', 'تنظيم حاسبات', 'CS204', 4, false, false),
    new Subject('CS319', 'لغة تجميع ASSEMBLY', 'CS303', 4, false, false),
    new Subject('CS425', 'شبكات حاسوب', 'CS319', 4, false, false),
    new Subject('CS321', 'معماية الحاسوب', 'CS319', 4, false, false),
    new Subject('CS416', 'برمجة نطم', 'CS321', 4, false, false),

    new Subject('CS312', 'تراكيب بيانات 1', 'CS207', 4, false, false),
    new Subject('CS418', 'تراكيب بيانات 2', 'CS312', 4, false, false),
    new Subject('CS426', 'ذكاء اصطناعي', 'CS418', 4, false, false),
    new Subject('CS308', 'طرق عددية', 'CS207', 4, false, false),
    new Subject('CS429', 'مواضيع مختارة 1', '115', 4, false, false, 115),
    new Subject('CS428', 'مواضيع مختارة 2', '115', 4, false, false, 115),
    new Subject('CS430', 'مناهج البحث والتدريب الميداني', '115', 2, false, false, 115),
    new Subject('', 'مشروع التخرج', '115', 4, false, false, 115),
]
let units = Subject.calcUnits(subjects);
console.log(units)

const subjectsProxy = subjects.map(createSubjectProxy);

function createSubjectProxy(subject) {
    const proxy = new Proxy(subject, {
        set(target, property, value) {
            // Only for debugging
            console.log(`Property '${property}' of subject '${target.code}' changed to '${value}'`);

            // Set the property that changed
            target[property] = value;

            // Handle Changes
            if (property === 'status') {
                subject.subjectHandler.handleStatusChange();
            }

            if (property === 'allowed') {
                subject.subjectHandler.handleAllowedChange();
            }

            return true;
        },
    });
    subject.setProxy(proxy);
    subject.setSubjects(subjects);
    return proxy;
}

subjectsProxy.forEach(function (subject) {
    subject.render(subjectContainer)
        .registerClickEvent();

    if (subject.root === '') {
        subject.setAllowed(true)
    }
})
