export type FAQItem = {
  question: string;
  answer: string;
  active?: boolean;
};

export const faqData: FAQItem[] = [
  {
    question: "Is You Institute Is Government Approved?",
    answer: "Yes",
  },
  {
    question: "Certificate Provided By Your Institute Is Government Approved?",
    answer: "Ans. Yes",
    active: true,
  },

  {
    question: "Where Is Head Office Of Your Institute ?",
    answer: "Delhi Office Firozabad",
  },
  {
    question: "Is Your Institute Provide Service For Institute All Over India?",
    answer: "Yes",
  },
];
