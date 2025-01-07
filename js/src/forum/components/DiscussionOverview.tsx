import Component from 'flarum/common/Component';
import type Mithril from 'mithril';
import Discussion from 'flarum/common/models/Discussion';
import shortTime from '../helpers/shortTime';
import Link from 'flarum/common/components/Link';
import Tooltip from 'flarum/common/components/Tooltip';
import avatar from 'flarum/common/helpers/avatar';

export default class DiscussionOverview<Attrs> extends Component {
  discussion: Discussion | null = null;
  oninit(vnode: Mithril.Vnode<Attrs, this>): void {
    super.oninit(vnode);
    this.discussion = vnode.attrs.discussion;
  }
  view() {
    const discussion = this.discussion;

    if (!discussion) {
      return null;
    }

    const discussion = this.discussion;
    const posts = discussion.posts();
    const lastPost = posts && posts.length > 0 ? posts[posts.length - 1] : null;

    const participants = discussion.participants() || [];

    return (
      <>
        <ul className="DiscussionOverview-list">
          <li className="created-at">
            <h4>{app.translator.trans('datlechin-discussion-overview.forum.created')}</h4>
            <div className="time">{shortTime(discussion.createdAt())}</div>
          </li>
          <li className="last-reply">
            <h4>{app.translator.trans('datlechin-discussion-overview.forum.last_reply')}</h4>
            {lastPost ? (
              <Link href={app.route.post(lastPost)}>
                <div className="time">
                  {avatar(lastPost.user())}
                  {shortTime(discussion.lastPostedAt())}
                </div>
              </Link>
            ) : null}
          </li>
          <li className="replies">
            <span className="number">{discussion.replyCount()}</span>
            <h4>{app.translator.trans('datlechin-discussion-overview.forum.replies')}</h4>
          </li>
          {app.initializers.has('michaelbelgium-discussion-views') ? (
            <li className="views">
              <span className="number">{discussion.viewCount()}</span>
              <h4>{app.translator.trans('datlechin-discussion-overview.forum.views')}</h4>
            </li>
          ) : null}
          <li className="users">
            <span className="number">{participants.length}</span>
            <h4>{app.translator.trans('datlechin-discussion-overview.forum.users')}</h4>
          </li>
          <li className="likes">
            <span
              className="number">{posts && posts.length > 0 && posts[0].likes() ? posts[0].likes().length : 0}</span>
            <h4>{app.translator.trans('datlechin-discussion-overview.forum.likes')}</h4>
          </li>
          <li className="avatars">
            <div className="user-list">
              {participants.map((user) => (
                <Tooltip key={user.id()} text={user.username()}>
                  <Link href={app.route.user(user)}>{avatar(user)}</Link>
                </Tooltip>
              ))}
            </div>
          </li>
        </ul>
      </>
    );
  }
}
