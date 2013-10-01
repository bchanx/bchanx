'''
Copyright (c) 2013 Brian Chan (bchanx.com)
All Rights Reserved.
'''

"""Add playlist

Revision ID: 4e0b5b350b1e
Revises: 59dce2d1e97e
Create Date: 2013-03-04 00:17:08.240791

"""

# revision identifiers, used by Alembic.
revision = '4e0b5b350b1e'
down_revision = '59dce2d1e97e'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('playlist',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=False, index=True),
    sa.Column('title', sa.String(length=80), nullable=True),
    sa.Column('state', sa.Integer(), nullable=False, server_default='0'),
    sa.Column('mediaIdList', sa.Text(), nullable=True),
    sa.Column('created', sa.DateTime(), nullable=True, server_default=u"2013-01-01 00:00:00.000000Z"),
    sa.Column('modified', sa.DateTime(), nullable=True, server_default=u"2013-01-01 00:00:00.000000Z"),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('playlist')
