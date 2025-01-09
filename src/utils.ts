type Schedule = {
    day: string;
    start: string;
    end: string;
}

interface Subject {
    name: string;
    teacher: string;
    group: string;
    semester: number;
    schedule: Schedule[];
}

export default function assignInterfaces(DataJson:any): Subject[]{
    let subjects: Subject[] = [];
    for (const subject of DataJson) {
        subjects.push({
            name: subject.Materia, 
            teacher: subject.Profesor,
            group: subject.Grupo,
            semester: subject.Semestre,
            schedule: subject.Horario   
        });
    }
    return subjects;
}