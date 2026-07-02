CREATE TABLE public.scheduled_pushes (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
    payload JSONB NOT NULL,
    processed BOOLEAN DEFAULT FALSE
);