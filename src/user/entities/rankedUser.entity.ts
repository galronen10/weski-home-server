import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'ranked_users',
  synchronize: false,
  expression: `SELECT id, name, image, "totalScore", row_number() OVER (ORDER BY "totalScore" DESC, id) AS rank FROM public."user"`,
})
export class RankedUser {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  image: string;

  @ViewColumn()
  totalScore: number;

  @ViewColumn()
  rank: number;
}
