interface Topic {
  id: number;
  title: string;
  degree: string;
  fieldOfStudy?: string;
  author?: string;
  status: boolean;
}

export default Topic;
