// The texts the stories show that are more than a string: what a site's Markdown would render
// to, and what its script would put into a list of search results, written out.
import { fullDate } from "./dates.ts";
import { linkedPage, picture, search } from "./fixtures.ts";
import { LinkCard } from "./LinkCard.tsx";

// One post, less one of its sections.
export const postBody = (
  <>
    <p>
      たまたまかもですが 1on1
      で二人連続でこんな話になったので。需要があるかもと思い、自分が普段考えていることをメモしてみます。
    </p>
    <h2>前提</h2>
    <ul>
      <li>カンバン方式で開発をしています。</li>
      <li>一週間のタイムボックスは軽く意識をしています（週次でのイベントがいくつかある）。</li>
      <li>バックログ ≒ ユーザーストーリーで、タスクはそれに内包されるやることリストです。</li>
    </ul>
    <h2>タスクの大きさ・小さくする考え方</h2>
    <p>
      バックログには、いくつかのタスクを登録することができます。これについてはこんな原則で考えてみましょう：
    </p>
    <ul>
      <li>タスクはどんなに大きくても１日以内に終わるようにする</li>
      <li>僕は普段は「午前中に終わるくらい」で考えます。三時間とか。</li>
      <li>
        三時間思いっきり開発をして、それでも完了できないものは、多分自分にとって複雑すぎるので。
      </li>
      <li>
        どんなに大きくても、タスクごとにプルリクエストを作る（複数のタスクをまとめて進めない）
      </li>
      <li>
        <strong>着手しないタスクには担当者をアサインしない</strong>
      </li>
    </ul>
    <p>
      太字がめっちゃ大事です。自分がアサインされてたら、まとめて進めたくなっちゃうのが人間の性なので。
    </p>
    <h2>タスクやバックログをどう分割するか</h2>
    <p>
      『アジャイルな見積りと計画づくり』がとてもわかりやすいです。時間がなかったら 12章だけで OK
      です。
    </p>
    <p>
      特に「曳光弾をとりあえず撃つ」のが重要です。詳しくは本を読んでほしいのですが、日本語だとこの記事がそこそこまとまってました：
    </p>
    <LinkCard {...linkedPage} image={picture} />
    <p>まとめると、こんな感じです：</p>
    <ul>
      <li>
        バックログは「これ単体でリリースしても効果が検証できるような、意味のあるまとまり」にする（そしてなるべく小さくする）。
      </li>
      <li>タスクは曳光弾のような開発から始めて、ちょっとずつ骨組みに肉付けを行なっていく。</li>
    </ul>
    <h2>参考図書たち</h2>
    <ul>
      <li>
        <a href="https://book.mynavi.jp/ec/products/detail/id=22141">
          アジャイルな見積りと計画づくり
        </a>
      </li>
      <li>
        <a href="https://www.oreilly.co.jp//books/9784873119397/">
          スクラム実践者が知るべき97のこと
        </a>
      </li>
    </ul>
  </>
);

// What else a post can hold, each piece from a different post. They do not read as one text.
export const otherBlocks = (
  <>
    <p>
      今年中にはそれぞれ最新バージョンにあげたい、そして <code>Gemfile</code> での Rails
      のバージョン固定を解除したい...！
    </p>
    <h3>経験学習</h3>
    <ol>
      <li>うまくできなかったこと・失敗したことがあった</li>
      <li>なぜ失敗したのか、過去に戻れるとしたらどうすればよかったのかを想像する</li>
    </ol>
    <blockquote>
      <p>
        権限を持った小さな職能横断チームこそが、高速なプロダクト開発とイノベーションの基盤である
      </p>
      <p>
        テック企業勤務の人たちがすぐれた仕事をしているのは、無料のラテやテーブルサッカー台のおかげなんかじゃない。権限が与えられ、信頼されているからこそ素晴らしい仕事をしているんだ。
      </p>
    </blockquote>
    <h4>仕事では、責任範囲が一気に広がった一年だった</h4>
    <ul>
      <li>やりたいことリストのうち、上から順に選んでいこう</li>
      <li>
        <strong>
          3つ目のチケットは3日くらいかかるか…。 これ入れると溢れちゃうから考え直そう。
        </strong>
        <ul>
          <li>
            <strong>3つ目のチケット、実は開発内容がいくつか混ざってるな。</strong>
          </li>
          <li>
            <strong>
              「検索条件を増やす」ってのを、条件ごとに小さいバックログに分割しちゃおう。
            </strong>
          </li>
        </ul>
      </li>
    </ul>
    <p>
      <img src={picture} alt="" />
    </p>
    <figure>
      <img src={picture} alt="" />
      <figcaption>4月に発表した当時の資料。年始は毎日何かしらの活動をしていました。</figcaption>
    </figure>
    <pre>
      <code>make check</code>
    </pre>
  </>
);

// What a search found, as the site's script would put it into the list: an item per post. The
// first dates itself with a `time`, the second with a `span`, which is what a script that only has
// the date as text writes.
const [first, second] = search.found;
if (!first || !second) throw new Error("the search fixture has fewer than two results");

export const foundItems = (
  <>
    <li>
      <time dateTime={first.post.date}>{fullDate(first.post.date)}</time>
      <a href={first.post.href}>{first.post.title}</a>
      <p>
        {first.before}
        <mark>{first.match}</mark>
        {first.after}
      </p>
    </li>
    <li>
      <span>{fullDate(second.post.date)}</span>
      <a href={second.post.href}>{second.post.title}</a>
      <p>
        {second.before}
        <mark>{second.match}</mark>
        {second.after}
      </p>
    </li>
  </>
);
