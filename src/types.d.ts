export interface Sponsor {
    name: string;
    logo: string;
    url: string;
  }

export interface Speaker {
    id: string;
    fullName: string;
    profilePicture: string;
    tagLine?: string;
  }

export interface Session {
    id: string;
    startsAt: string;
    endsAt: string;
    isServiceSession: boolean;
    title: string;
    description?: string;
  }