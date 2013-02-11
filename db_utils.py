#!/user/bin/env python

"""
Database migration scripts, thanks to Miguel Grinberg.
http://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database
"""

import sys
import imp
import os.path
from web import db
from migrate.versioning import api
from config import LocalProperties as p


def create():
  """Creates our db_repository to store migration files."""
  print 'Creating...'
  db.create_all()
  if not os.path.exists(p.SQLALCHEMY_MIGRATE_REPO):
    api.create(p.SQLALCHEMY_MIGRATE_REPO, 'database repository')
    api.version_control(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO)
  else:
    api.version_control(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO, api.version(p.SQLALCHEMY_MIGRATE_REPO))
  print 'Database created!'


def migrate():
  """Creates the latest migration file."""
  print 'Migrating...'
  migration = p.SQLALCHEMY_MIGRATE_REPO + '/versions/%03d_migration.py' % (api.db_version(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO) + 1)
  tmp_module = imp.new_module('old_model')
  old_model = api.create_model(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO)
  exec old_model in tmp_module.__dict__
  script = api.make_update_script_for_model(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO, tmp_module.meta, db.metadata)
  open(migration, 'wt').write(script)
  a = api.upgrade(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO)
  print 'New migration saved as ' + migration
  print 'Current database version: ' + str(api.db_version(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO))


def upgrade():
  """Patch our db to the newest migration."""
  print 'Upgrading...'
  api.upgrade(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO)
  print 'Current database version: ' + str(api.db_version(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO))


def downgrade():
  """Revert our db to the previous migration."""
  print 'Downgrading...'
  v = api.db_version(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO)
  if v > 0:
    api.downgrade(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO, v - 1)
  print 'Current database version: ' + str(api.db_version(p.SQLALCHEMY_DATABASE_URI, p.SQLALCHEMY_MIGRATE_REPO))


if __name__ == '__main__':
  if len(sys.argv) < 2:
    print 'Usage: python ./db_utils.py --[create|migrate|upgrade|downgrade]'
    exit(1)
  runnable = {'--create': create, '--migrate': migrate, '--upgrade': upgrade, '--downgrade': downgrade}
  if sys.argv[1] in runnable:
    runnable[sys.argv[1]]()

