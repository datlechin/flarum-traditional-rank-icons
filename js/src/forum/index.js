import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import User from 'flarum/common/models/User';
import PostUser from 'flarum/forum/components/PostUser';
import PostStream from 'flarum/forum/components/PostStream';
import ItemList from 'flarum/common/utils/ItemList';
import RankBadge from './components/RankBadge';
import listItems from 'flarum/common/helpers/listItems';

app.initializers.add('datlechin/flarum-traditional-rank-icons', () => {
  override(User.prototype, 'badges', function () {
    const items = new ItemList();
    const groups = this.groups();

    groups.forEach((group) => {
      items.add(`group${group?.id()}`, <RankBadge group={group} />);
    });

    return items;
  });
});
