interface UserProfile {
  id: number;
  userName:string
  email: string;
}
interface UserState {
  loading: boolean;
  error: string | null;
  profile: UserProfile | null;
}
