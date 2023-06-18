export interface InsightDataInterface {
    ticketId: string;
    title: string;
    date: string;
    imgs: { src: string; alt: string }[];
    outcomeNumber: number;
    keyStat: string;
    keyNumber: string;
    tldr: string;
    takeaways: string;
}
