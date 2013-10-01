'''
Copyright (c) 2013 Brian Chan (bchanx.com)
All Rights Reserved.
'''

"""Add uniqueId to media table

Revision ID: 3df12f34f4ca
Revises: 4e0b5b350b1e
Create Date: 2013-03-11 02:26:32.825905

"""

# revision identifiers, used by Alembic.
revision = '3df12f34f4ca'
down_revision = '4e0b5b350b1e'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


def upgrade():
    op.add_column('media', sa.Column('uniqueId', sa.String(length=100)))
    op.alter_column('media', u'mediaType',
               existing_type=sa.INTEGER(),
               nullable=False,
               server_default='-1')


def downgrade():
    op.alter_column('media', u'mediaType',
               existing_type=sa.INTEGER(),
               nullable=True,
               server_default=None)
    op.drop_column('media', 'uniqueId')
