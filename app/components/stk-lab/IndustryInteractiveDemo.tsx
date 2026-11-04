"use client";

import { useState } from "react";

type Locale = "ru" | "en";
type Sector = "conferences" | "learning-platforms";

export default function IndustryInteractiveDemo({ locale, sector }: { locale: Locale; sector: Sector }) {
  const [choice, setChoice] = useState<number | null>(null);
  const [registered, setRegistered] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [lesson, setLesson] = useState(0);
  const ru = locale === "ru";
  const learning = sector === "learning-platforms";
  const lessons = ru
    ? [{ title: "Обратная связь", question: "Как помогает обратная связь?", options: ["Проверять знания и давать обратную связь", "Только показывать видео", "Автоматически выставлять оценки без проверки"], correct: 0 }, { title: "Практика", question: "Что помогает закрепить новую тему?", options: ["Пропустить упражнения", "Выполнить задание и разобрать ошибки", "Только прочитать заголовок"], correct: 1 }]
    : [{ title: "Feedback", question: "What makes feedback useful?", options: ["Check knowledge and provide feedback", "Only show videos", "Grade everything without review"], correct: 0 }, { title: "Practice", question: "What helps reinforce a new topic?", options: ["Skip exercises", "Complete a task and review mistakes", "Only read the title"], correct: 1 }];
  const options = learning
    ? lessons[lesson].options
    : (ru ? ["09:30 — Открытие", "11:00 — Практикум", "14:00 — Панель экспертов"] : ["09:30 — Opening keynote", "11:00 — Workshop", "14:00 — Expert panel"]);
  return (
    <section aria-labelledby={`interactive-demo-${sector}`} className="mx-auto mt-16 max-w-6xl rounded-3xl border border-[#ddd3ca] bg-white p-6 text-[#211a17] md:p-10">
      <p className="text-xs uppercase tracking-[.2em] text-[#796c65]">{ru ? "Интерактивный прототип" : "Interactive prototype"}</p>
      <h2 id={`interactive-demo-${sector}`} className="mt-3 text-3xl font-medium">
        {learning ? (ru ? "Мини-урок и проверка знаний" : "Mini lesson and knowledge check") : (ru ? "Программа и регистрация" : "Agenda and registration")}
      </h2>
      <p className="mt-3 max-w-2xl text-[#675c56]">
        {ru ? "Демонстрация интерфейса без подключения к серверу, оплате или реальным заявкам." : "Interface demonstration only; no backend, payments or real submissions."}
      </p>
      {learning && <p className="mt-3 text-sm text-[#675c56]">{ru ? "Прогресс хранится только до обновления страницы; личного кабинета и сохранения результатов нет." : "Progress lasts only until page refresh; no student account or saved results."}</p>}
      <div className="mt-8 rounded-2xl bg-[#f6f2ed] p-5 md:p-7">
        {learning && <div className="mb-5"><p className="text-sm font-medium">{ru ? "Прогресс демо-курса" : "Demo course progress"}: {completedLessons.length}/{lessons.length}</p><progress className="mt-2 w-full accent-[#211a17]" value={completedLessons.length} max={lessons.length} aria-label={ru ? "Прогресс уроков" : "Lesson progress"} /><div className="mt-3 flex flex-wrap gap-2">{lessons.map((item, index) => <button type="button" key={item.title} aria-pressed={lesson === index} onClick={() => { setLesson(index); setChoice(null); }} className={`rounded-full border px-4 py-2 text-sm ${lesson === index ? "border-[#211a17] bg-white" : "border-[#ddd3ca]"}`}>{index + 1}. {item.title}{completedLessons.includes(index) ? " ✓" : ""}</button>)}</div></div>}
        <h3 className="text-xl font-medium">{learning ? lessons[lesson].question : (ru ? "Выберите сессию" : "Choose a session")}</h3>
        <div className="mt-5 grid gap-3">
          {options.map((option, index) => (
            <button key={option} type="button" aria-pressed={choice === index} onClick={() => { setChoice(index); setRegistered(false); if (learning && index === lessons[lesson].correct) setCompletedLessons((previous) => previous.includes(lesson) ? previous : [...previous, lesson]); }}
              className={`rounded-xl border px-5 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#211a17] ${choice === index ? "border-[#211a17] bg-white" : "border-[#ddd3ca] bg-transparent hover:bg-white"}`}>
              {option}
            </button>
          ))}
        </div>
        <div role="status" aria-live="polite" aria-atomic="true">
        {choice !== null && (
          <div className="mt-5 rounded-xl border border-[#ddd3ca] bg-white p-5">
            {learning ? (
              <p>{choice === lessons[lesson].correct ? (ru ? "Верно! Урок отмечен как пройденный в этом демо." : "Correct! This lesson is marked complete in this demo.") : (ru ? "Попробуйте ещё раз: полезная платформа не только показывает контент, но и помогает учиться." : "Try again: a useful platform does more than display content; it supports learning.")}</p>
            ) : (
              <>
                <p>{ru ? "Выбранная сессия:" : "Selected session:"} <strong>{options[choice]}</strong></p>
                <button type="button" onClick={() => setRegistered(true)} className="mt-4 rounded-full bg-[#211a17] px-6 py-3 text-white focus-visible:outline-2 focus-visible:outline-offset-2">
                  {ru ? "Имитировать регистрацию" : "Simulate registration"}
                </button>
                {registered && <p className="mt-3">{ru ? "Готово! Это только демонстрация — данные не отправлены." : "Done! This is a demo only; no data was submitted."}</p>}
              </>
            )}
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
