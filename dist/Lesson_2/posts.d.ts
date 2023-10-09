interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}
declare const getPostsByUserId: (id: number) => Promise<IPost[]>;
declare const start: () => Promise<void>;
