type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  avatar: string;
};

type SearchResponse = {
  success: boolean;
  data: User[];
};

export { User, SearchResponse };
