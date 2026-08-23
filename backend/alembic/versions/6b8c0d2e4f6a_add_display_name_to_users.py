"""add display_name to users

Revision ID: 6b8c0d2e4f6a
Revises: 5a7b9c1d3e5f
Create Date: 2026-08-23 14:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = '6b8c0d2e4f6a'
down_revision: Union[str, None] = '5a7b9c1d3e5f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'users',
        sa.Column('display_name', sa.String(length=50), nullable=True),
    )
    # Backfill existing users with the email local part (before '@').
    connection = op.get_bind()
    rows = connection.execute(
        sa.text("SELECT id, email FROM users WHERE display_name IS NULL")
    ).fetchall()
    for row_id, email in rows:
        local_part = email.split("@")[0] if "@" in email else "learner"
        connection.execute(
            sa.text("UPDATE users SET display_name = :dn WHERE id = :id"),
            {"dn": local_part, "id": row_id},
        )
    op.alter_column('users', 'display_name', nullable=False)


def downgrade() -> None:
    op.drop_column('users', 'display_name')