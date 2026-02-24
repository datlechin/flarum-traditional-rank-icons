import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';
import ItemList from 'flarum/common/utils/ItemList';
import Badge from 'flarum/common/components/Badge';
import RankBadge from './components/RankBadge';

app.initializers.add('datlechin/flarum-traditional-rank-icons', () => {
  override('flarum/common/models/User', 'badges', function () {
    const items = new ItemList();
    const groups = this.groups();

    groups.forEach((group) => {
      items.add(`group${group?.id()}`, <RankBadge group={group} />);
    });

    // For flarum/suspend
    if (app.initializers.has('flarum-suspend')) {
      const until = this.suspendedUntil();

      if (new Date() < until) {
        items.add(
          'suspended',
          <Badge icon="fas fa-ban" type="suspended" label={app.translator.trans('flarum-suspend.forum.user_badge.suspended_tooltip')} />
        );
      }
    }

    return items;
  });
});
