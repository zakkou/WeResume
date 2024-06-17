import { Link } from "components/documentation";

const QAS = [
  {
    question:
      "Q1. What is a resume builder? Why resume builder is better than resume template doc?",
    answer: (
      <>
        <p>
          There are two ways to create a resume today. One option is to use a
          resume template, such as an office/google doc, and customize it
          according to your needs. The other option is to use a resume builder,
          an online tool that allows you to input your information and
          automatically generates a resume for you.
        </p>
        <p>
        In this project, we are leveraging artificial intelligence to build an 
        advanced resume builder. The AI component, powered by a language model 
        like LLama2, generates skills and other relevant content for the resume 
        based on the user’s domain of expertise. 
        </p>
      </>
    ),
  },
  {
    question:
      "Q2. What uniquely sets WeResume apart from other resume builders and templates?",
    answer: (
      <>
        <p>
          Other than WeResume, there are some great free resume builders out
          there, e.g. <Link href="https://rxresu.me/">Reactive Resume</Link>,{" "}
          <Link href="https://flowcv.com/">FlowCV</Link>. However, WeResume
          stands out with 2 distinctive features:
        </p>{" "}
        <p>
          <span className="font-semibold">
            1. WeResume is designed specifically for all job markets and
            best practices.
          </span>
          <br />
          It offers the core sections, e.g. profile, work
          experience, education, and skills, while omitting unnecessary sections
          like references. Additionally, WeResume only offers a top down
          single column resume design as opposed to two column design, because
          single column design works best for AST. <br />{" "}
        </p>
        <p>
          <span className="font-semibold">
            2. WeResume is super privacy focus.
          </span>{" "}
          <br />
          While other resume builders may require email sign up and store user
          data in their databases, WeResume believes that resume data should
          remain private and accessible only on user’s local machine. Therefore,
          WeResume doesn’t require sign up to use the app, and all inputted
          data is stored in user’s browser that only user has access to.
        </p>
      </>
    ),
  },
  {
    question: "Q3. Who created WeResume and why?",
    answer: (
      <p>
        WeResume was created by{" "}
        <Link href="https://wereact.co/">WeReact</Link>  as
        an end of studies project. We all had made many mistakes
        when creating our first resumes and applying for internships and jobs.
        It took us a long while to learn some of the best practices. While
        mentoring first generation students and reviewing their resumes, we
        noticed students were making the same mistakes that we had made before.
        This led us to think about how we can be of help with the knowledge and
        skills we have gained. We started chatting and working over the weekends
        that led to WeResume, where we integrated best practices and our
        knowledge into this resume builder. Our hope is that WeResume can help
        anyone to easily create a modern professional resume that follows best
        practices and enable anyone to apply for jobs with confidence.
      </p>
    ),
  },
];

export const QuestionsAndAnswers = () => {
  return (
    <section className="mx-auto max-w-3xl divide-y divide-gray-300 lg:mt-4 lg:px-2">
      <h2 className="text-center text-3xl font-bold">Questions & Answers</h2>
      <div className="mt-6 divide-y divide-gray-300">
        {QAS.map(({ question, answer }) => (
          <div key={question} className="py-6">
            <h3 className="font-semibold leading-7">{question}</h3>
            <div className="mt-3 grid gap-2 leading-7 text-gray-600">
              {answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
