interface EditTopic {
  id: number;
  title: string;
  degree: string;
  fieldOfStudy?: string;
  author?: string;
  description?: string;
  status: boolean;
}

export default EditTopic;
