'''
Copyright (c) 2013 Brian Chan (bchanx.com)
All Rights Reserved.
'''

"""Table name to media

Revision ID: 59dce2d1e97e
Create Date: 2013-02-16 17:15:34.028332

"""

# revision identifiers, used by Alembic.
revision = '59dce2d1e97e'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('media',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mediaId', sa.String(length=80), nullable=True),
    sa.Column('mediaType', sa.Integer(), nullable=True, index=True),
    sa.Column('title', sa.String(length=200), nullable=True),
    sa.Column('duration', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('mediaId', 'mediaType'),
    )


def downgrade():
    op.drop_table('media')
