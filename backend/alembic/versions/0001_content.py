"""Initialize the public content database; no learner records are stored."""
from alembic import op
import sqlalchemy as sa

revision = '0001_content'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    if not sa.inspect(op.get_bind()).has_table('lessons'):
        op.create_table('lessons',sa.Column('id',sa.String(),primary_key=True),sa.Column('payload',sa.JSON(),nullable=False))

def downgrade():
    op.drop_table('lessons')
