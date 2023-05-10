interface NewTopic {
  title: string;
  degree: string;
  fieldOfStudy?: string;
  author?: string;
  description?: string;
  status: boolean;
  createdAt: Date;
}

export default NewTopic;
